import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  input,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';

import { CommonModule } from '@angular/common';
import { CommonMaterialModule } from '@wyn/material';

import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserEntity } from '../../models/user-entity.model';
import { FormState } from '../../models/form-state.enum';
import { RandomUtil } from '../../utils/random-util';

import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'wyn-user-form',
  standalone: true,
  imports: [
    CommonModule,
    CommonMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() allUsers!: UserEntity[];
  @Input() formState: FormState | null = FormState.READY;

  @Output() private readonly userSaved: EventEmitter<UserEntity> =
    new EventEmitter<UserEntity>();

  formGroup!: FormGroup;
  isFormValid = true;
  selectedFriendNames: string[] = [];
  friendNameAutocompleteOptions: string[] = [];

  @ViewChild('formElem')
  private readonly formElem!: NgForm;

  @ViewChild('friendNameInput')
  private readonly friendNameInputElem!: ElementRef;

  private get friendNameInputControl(): AbstractControl {
    return this.formGroup.controls['friendNameInput'];
  }

  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildAndListenForFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allUsers'] && this.formGroup) {
      if (this.getCanAddFriends()) {
        this.friendNameInputControl.enable();
      } else {
        this.friendNameInputControl.disable();
      }
    }
    if (changes['formState']) {
      this.setFormState();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  get isFormBusy(): boolean {
    return (
      this.formState === FormState.SAVING ||
      this.formState === FormState.LOADING
    );
  }

  onClickPopulateRandomData(e: Event): void {
    e.preventDefault();

    this.formGroup.patchValue({
      name: RandomUtil.stringGen(),
      age: RandomUtil.getRandomInt(1, 100),
      weight: RandomUtil.getRandomInt(8, 400),
      friendNameInput: '',
    });

    this.selectedFriendNames = Array.isArray(this.allUsers)
      ? RandomUtil.getRandomArraySubset(this.allUsers).map((u: any) => u.name)
      : [];
  }

  onRemovedUserFriend(friendName: string): void {
    this.selectedFriendNames = this.selectedFriendNames.filter(
      (name: string) => {
        return name !== friendName;
      }
    );
  }

  onAvailableFriendSelected(event: MatAutocompleteSelectedEvent): void {
    const friendName: string = event.option.viewValue;
    this.selectedFriendNames = [...this.selectedFriendNames, friendName];

    this.friendNameInputElem.nativeElement.value = '';
    this.friendNameInputControl.setValue(null);
  }

  onFormSubmit(): void {
    if (!this.isFormValid) {
      return;
    }

    // Get the new user object from the form
    const formUser: FormUser = this.formGroup.value as FormUser;
    const newUser: UserEntity = {
      name: formUser.name,
      age: formUser.age,
      weight: formUser.weight,
      friendNames: this.selectedFriendNames,
    };

    // Emit the new user
    this.userSaved.emit(newUser);
  }

  onClickReset(evt: Event): void {
    this.resetForm();
    evt.preventDefault(); // don't submit
  }

  // private methods: init

  private buildForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(3),
        ])
      ),
      weight: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(3),
        ])
      ),
      friendNameInput: new FormControl(),
    });
  }

  private buildAndListenForFormChanges(): void {
    this.buildForm();

    // Listen for changes to form state
    this.formGroup.statusChanges.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: this.onFormGroupStatusChanged.bind(this),
    });

    // React to friend name input value changes
    this.friendNameInputControl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy$))
      .subscribe(this.onFriendNameValueChanged.bind(this));
  }

  private onFormGroupStatusChanged(): void {
    this.updateIsFormValid();
  }

  // private methods: friend name input

  private onFriendNameValueChanged(friendNameInputText?: string): void {
    if (!friendNameInputText) {
      this.friendNameAutocompleteOptions = [];
    } else {
      this.friendNameAutocompleteOptions =
        this.getMatchingAvailableFriendNames(friendNameInputText);
    }
  }

  private getMatchingAvailableFriendNames(inputText: string): string[] {
    inputText = inputText.toLowerCase();
    return this.getAvailableFriendNames().filter(
      (availableFriendName: string) => {
        availableFriendName = availableFriendName.toLowerCase();
        const isOptionMatch: boolean =
          availableFriendName.startsWith(inputText);
        return isOptionMatch;
      }
    );
  }

  private getAvailableFriendNames(): string[] {
    if (!this.allUsers) {
      return [];
    }
    return this.allUsers
      .map((user: UserEntity) => user.name)
      .filter((userName: string) => {
        return !this.selectedFriendNames.includes(userName);
      });
  }

  private getCanAddFriends(): boolean {
    return this.allUsers != null && this.allUsers.length > 0;
  }

  // private methods: helper

  private setFormState(): void {
    // Enable/disable form
    if (this.formGroup) {
      if (this.isFormBusy) {
        this.formGroup.disable();
        return;
      }
      this.formGroup.enable();
    }

    // Reset the form if appropriate
    if (this.formState === FormState.SAVED) {
      this.resetForm();
    }
  }

  private updateIsFormValid(): void {
    this.isFormValid = this.isControlValid(this.formGroup);
  }

  private isControlValid(c: AbstractControl): boolean {
    return !c.invalid && !c.pending;
  }

  private resetForm(): void {
    this.selectedFriendNames = [];
    this.formElem.resetForm();
    this.formGroup.markAsUntouched();
  }
}

interface FormUser {
  name: string;
  age: number;
  weight: number;
  friendNameInput: string;
}
