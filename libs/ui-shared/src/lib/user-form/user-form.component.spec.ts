import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormState } from '../../models/form-state.enum';
import { UserEntity } from '../../models/user-entity.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserFormComponent', () => {
  let comp: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, UserFormComponent],
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call buildFormAndListenForChanges()', () => {
      const spy = jest.spyOn(comp as any, 'buildAndListenForFormChanges');

      comp.ngOnInit();

      expect(spy).toHaveBeenCalledWith();
    });
  });

  describe('ngOnChanges', () => {
    let changes: SimpleChanges;
    let enableSpy: any;
    let disableSpy: any;
    let setFormStateSpy: any;

    beforeEach(() => {
      changes = {};
      enableSpy = jest.spyOn(comp['friendNameInputControl'], 'enable');
      disableSpy = jest.spyOn(comp['friendNameInputControl'], 'disable');
      setFormStateSpy = jest.spyOn(comp as any, 'setFormState');
    });

    describe('allUsers change', () => {
      beforeEach(() => {
        changes['allUsers'] = {} as SimpleChange;
      });

      it('should enable friendNameInputControl if can add friends', () => {
        jest.spyOn(comp as any, 'getCanAddFriends').mockReturnValue(true);

        comp.ngOnChanges(changes);

        expect(enableSpy).toHaveBeenCalledWith();
        expect(disableSpy).not.toHaveBeenCalled();
        expect(setFormStateSpy).not.toHaveBeenCalled();
      });

      it('should disable friendNameInputControl if cannot add friends', () => {
        jest.spyOn(comp as any, 'getCanAddFriends').mockReturnValue(false);
        comp.ngOnChanges(changes);

        expect(enableSpy).not.toHaveBeenCalled();
        expect(disableSpy).toHaveBeenCalledWith();
        expect(setFormStateSpy).not.toHaveBeenCalled();
      });
    });

    describe('formState change', () => {
      beforeEach(() => {
        changes['formState'] = {} as SimpleChange;
      });

      it('should set form state', () => {
        comp.ngOnChanges(changes);

        expect(enableSpy).toHaveBeenCalled();
        expect(disableSpy).not.toHaveBeenCalled();
        expect(setFormStateSpy).toHaveBeenCalledWith();
      });
    });
  });

  describe('isFormBusy', () => {
    it('should return true is form is LOADING', () => {
      fixture.componentRef.setInput('formState', FormState.LOADING);
      expect(comp.isFormBusy).toBe(true);
    });

    it('should return false is form is READY', () => {
      fixture.componentRef.setInput('formState', FormState.READY);
      expect(comp.isFormBusy).toBe(false);
    });

    it('should return true is form is SAVING', () => {
      fixture.componentRef.setInput('formState', FormState.SAVING);
      expect(comp.isFormBusy).toBe(true);
    });

    it('should return false is form is SAVED', () => {
      fixture.componentRef.setInput('formState', FormState.SAVED);
      expect(comp.isFormBusy).toBe(false);
    });

    it('should return false is form is ERROR', () => {
      fixture.componentRef.setInput('formState', FormState.ERROR);
      expect(comp.isFormBusy).toBe(false);
    });
  });

  describe('onClickPopulateRandomData', () => {
    it('should populate form with random data', () => {
      comp['buildForm']();

      const evt: Event = new Event('foo');
      const preventDefaultSpy = jest.spyOn(evt, 'preventDefault');

      comp.onClickPopulateRandomData(evt);

      expect(String(comp.formGroup.controls['name'].value)).toMatch(
        /[A-Z][a-z]+/
      );
      expect(String(comp.formGroup.controls['age'].value)).toMatch(/\d+/);
      expect(String(comp.formGroup.controls['weight'].value)).toMatch(/\d+/);
      expect(String(comp.formGroup.controls['friendNameInput'].value)).toBe('');
      expect(preventDefaultSpy).toHaveBeenCalledWith();
    });
  });

  describe('onRemovedUserFriend', () => {
    it('should remove friendName from selectedFriendNames', () => {
      comp.selectedFriendNames = ['Abe', 'Bob', 'Cal', 'Doug'];

      comp.onRemovedUserFriend('Cal');

      expect(comp.selectedFriendNames).toEqual(['Abe', 'Bob', 'Doug']);
    });
  });

  describe('onAvailableFriendSelected', () => {
    it('should add friend from event to selectedFriendNames and reset', () => {
      comp['buildForm']();

      comp['friendNameInputControl'].setValue('Mr. F');
      const friendName = 'Mr. Friend';
      const event: MatAutocompleteSelectedEvent = {
        option: {
          viewValue: friendName,
        },
      } as MatAutocompleteSelectedEvent;
      comp.selectedFriendNames = ['Andrew', 'Erica'];

      comp.onAvailableFriendSelected(event);

      expect(comp.selectedFriendNames).toEqual(['Andrew', 'Erica', friendName]);
      expect(comp['friendNameInputControl'].value).toBe(null);
    });
  });

  describe('onFormSubmit', () => {
    it('should trigger userSaved.emit() with the user data when the form is valid', () => {
      const name = 'Helen';
      const age = 44;
      const weight = 222;

      comp['buildForm']();

      comp.formGroup.controls['name'].setValue(name);
      comp.formGroup.controls['age'].setValue(age);
      comp.formGroup.controls['weight'].setValue(weight);
      comp.selectedFriendNames = ['Joseph', 'Wayne'];
      comp.isFormValid = true;

      const newUser: UserEntity = {
        name,
        age,
        weight,
        friendNames: comp.selectedFriendNames,
      };
      const userSavedSpy = jest.spyOn(comp['userSaved'], 'emit');

      comp.onFormSubmit();

      expect(userSavedSpy).toHaveBeenCalledWith(newUser);
    });

    it('should not trigger userSaved.emit() when the form is invalid', () => {
      const name = 'Helen';
      const age = 'a woman never reveals her age';
      const weight = 'how rude...';

      comp['buildForm']();

      comp.formGroup.controls['name'].setValue(name);
      comp.formGroup.controls['age'].setValue(age);
      comp.formGroup.controls['weight'].setValue(weight);
      comp.selectedFriendNames = ['Joseph', 'Wayne'];
      comp.isFormValid = false;

      const userSavedSpy = jest.spyOn(comp['userSaved'], 'emit');

      comp.onFormSubmit();

      expect(userSavedSpy).not.toHaveBeenCalled();
    });
  });

  describe('onClickReset', () => {
    it('should call resetForm() and preventDefault()', () => {
      const evt: Event = new Event('foo');
      const resetFormSpy = jest.spyOn(comp as any, 'resetForm');
      const preventDefaultSpy = jest.spyOn(evt, 'preventDefault');

      comp.onClickReset(evt);

      expect(resetFormSpy).toHaveBeenCalledWith();
      expect(preventDefaultSpy).toHaveBeenCalledWith();
    });
  });

  describe('buildFormAndListenForChanges', () => {
    it('should call buildForm() and buildAndListenForFormChanges()', () => {
      const buildFormSpy = jest.spyOn(comp as any, 'buildForm');
      const buildAndListenForFormChangesSpy = jest.spyOn(
        comp as any,
        'buildAndListenForFormChanges'
      );

      comp['buildAndListenForFormChanges']();

      expect(buildFormSpy).toHaveBeenCalledWith();
      expect(buildAndListenForFormChangesSpy).toHaveBeenCalledWith();
    });
  });

  describe('buildForm', () => {
    it('should create form group and controls', () => {
      comp['buildForm']();

      const formControlNames = Object.keys(comp.formGroup.controls);
      expect(formControlNames).toEqual([
        'name',
        'age',
        'weight',
        'friendNameInput',
      ]);
    });
  });

  describe('buildAndListenForFormChanges', () => {
    it('should do nothing until form status changes', () => {
      comp['buildForm']();
      const onFormGroupStatusChangedSpy = jest.spyOn(
        comp as any,
        'onFormGroupStatusChanged'
      );
      const onFriendNameValueChangedSpy = jest.spyOn(
        comp as any,
        'onFriendNameValueChanged'
      );

      comp['buildAndListenForFormChanges']();

      expect(onFormGroupStatusChangedSpy).not.toHaveBeenCalled();
      expect(onFriendNameValueChangedSpy).not.toHaveBeenCalled();
    });

    it('should call onFormGroupStatusChanged() when form status changes', () => {
      comp['buildForm']();
      const onFormGroupStatusChangedSpy = jest.spyOn(
        comp as any,
        'onFormGroupStatusChanged'
      );
      const onFriendNameValueChangedSpy = jest.spyOn(
        comp as any,
        'onFriendNameValueChanged'
      );

      comp['buildAndListenForFormChanges']();

      comp.formGroup.controls['name'].setValue('name');
      expect(onFormGroupStatusChangedSpy).toHaveBeenCalledWith('INVALID');

      comp.formGroup.controls['age'].setValue(123);
      expect(onFormGroupStatusChangedSpy).toHaveBeenCalledWith('INVALID');

      comp.formGroup.controls['weight'].setValue(123);
      expect(onFormGroupStatusChangedSpy).toHaveBeenCalledWith('VALID');

      expect(onFriendNameValueChangedSpy).not.toHaveBeenCalled();
    });

    it('should call onFriendNameValueChangedSpy() when friendNameInput value changes', () => {
      comp['buildForm']();
      const onFriendNameValueChangedSpy = jest.spyOn(
        comp as any,
        'onFriendNameValueChanged'
      );

      comp['buildAndListenForFormChanges']();
      comp.formGroup.controls['friendNameInput'].setValue('Charlie');
      comp.formGroup.controls['friendNameInput'].setValue('Charlie'); // test distinctUntilChanged

      expect(onFriendNameValueChangedSpy).toHaveBeenCalledTimes(1);
      expect(onFriendNameValueChangedSpy).toHaveBeenCalledWith('Charlie');
    });
  });

  describe('onFormGroupStatusChanged', () => {
    it('should call updateIsFormValid()', () => {
      const updateIsFormValidSpy = jest.spyOn(comp as any, 'updateIsFormValid');

      comp['onFormGroupStatusChanged']();

      expect(updateIsFormValidSpy).toHaveBeenCalledWith();
    });
  });

  describe('onFriendNameValueChanged', () => {
    it('should set friendNameAutocompleteOptions to [] if text is missing', () => {
      const getMatchingAvailableFriendNamesSpy = jest.spyOn(
        comp as any,
        'getMatchingAvailableFriendNames'
      );

      comp['onFriendNameValueChanged']();

      expect(comp.friendNameAutocompleteOptions).toEqual([]);
      expect(getMatchingAvailableFriendNamesSpy).not.toHaveBeenCalled();
    });

    it('should set friendNameAutocompleteOptions to [] if text is empty', () => {
      const getMatchingAvailableFriendNamesSpy = jest.spyOn(
        comp as any,
        'getMatchingAvailableFriendNames'
      );
      const friendNameInputText = '';

      comp['onFriendNameValueChanged'](friendNameInputText);

      expect(comp.friendNameAutocompleteOptions).toEqual([]);
      expect(getMatchingAvailableFriendNamesSpy).not.toHaveBeenCalled();
    });

    it('should set friendNameAutocompleteOptions if text is non-empty', () => {
      const friendNameAutocompleteOptions = ['Mr. Sandman'];
      jest.spyOn(comp as any, 'getMatchingAvailableFriendNames').mockReturnValue(
        friendNameAutocompleteOptions
      );
      const friendNameInputText = 'Mr. S';
      comp['onFriendNameValueChanged'](friendNameInputText);

      expect(comp.friendNameAutocompleteOptions).toEqual(
        friendNameAutocompleteOptions
      );
    });
  });

  describe('getMatchingAvailableFriendNames', () => {
    it('should return [] if there are no available friends', () => {
      const inputText = 'mother g';

      fixture.componentRef.setInput('allUsers', []);

      const result: string[] =
        comp['getMatchingAvailableFriendNames'](inputText);

      expect(result).toEqual([]);
    });

    it('should return [] if none of the available friends match', () => {
      const inputText = 'mother g';

      fixture.componentRef.setInput('allUsers', [
        { name: 'Humpty Dumpty' },
        { name: 'Geppetto' },
      ] as UserEntity[]);

      const result: string[] =
        comp['getMatchingAvailableFriendNames'](inputText);

      expect(result).toEqual([]);
    });

    it('should return matching available friends', () => {
      const inputText = 'mother g';
      fixture.componentRef.setInput('allUsers', [
        { name: 'Humpty Dumpty' },
        { name: 'Mother Goose' },
        { name: 'Mother Gothel' },
        { name: 'Humpty Dumpty' },
        { name: 'Geppetto' },
      ] as UserEntity[]);

      const result: string[] =
        comp['getMatchingAvailableFriendNames'](inputText);

      expect(result).toEqual(['Mother Goose', 'Mother Gothel']);
    });
  });

  describe('getCanAddFriends', () => {
    it('should return false if there are no users', () => {
      fixture.componentRef.setInput('allUsers', [] as UserEntity[]);

      expect(comp['getCanAddFriends']()).toBe(false);
    });

    it('should return true if users exist', () => {
      fixture.componentRef.setInput('allUsers', [{}] as UserEntity[]);

      expect(comp['getCanAddFriends']()).toBe(true);
    });
  });

  describe('setFormState', () => {
    it('should update formState and disable form', () => {
      comp['buildForm']();
      expect(comp.formGroup.enabled).toBe(true);

      const resetFormSpy = jest.spyOn(comp as any, 'resetForm');

      fixture.componentRef.setInput('formState', FormState.SAVING);
      comp['setFormState']();

      expect(comp.formState).toBe(FormState.SAVING);
      expect(comp.formGroup.enabled).toBe(false);
      expect(resetFormSpy).not.toHaveBeenCalled();
    });

    it('should update formState and enable form', () => {
      comp['buildForm']();

      const resetFormSpy = jest.spyOn(comp as any, 'resetForm');

      fixture.componentRef.setInput('formState', FormState.READY);
      comp['setFormState']();

      expect(comp.formState).toBe(FormState.READY);
      expect(comp.formGroup.enabled).toBe(true);
      expect(resetFormSpy).not.toHaveBeenCalled();
    });

    it('should update formState and enable form and reset form', () => {
      comp['buildForm']();

      const resetFormSpy = jest.spyOn(comp as any, 'resetForm');

      fixture.componentRef.setInput('formState', FormState.SAVED);
      comp['setFormState']();

      expect(comp.formState).toBe(FormState.SAVED);
      expect(comp.formGroup.enabled).toBe(true);
      expect(resetFormSpy).toHaveBeenCalled();
    });
  });

  describe('updateIsFormValid', () => {
    it('should set isFormValid to false', () => {
      comp['buildForm']();

      comp['updateIsFormValid']();

      expect(comp.isFormValid).toBe(false);
    });

    it('should set isFormValid to true', () => {
      comp['buildForm']();
      comp.formGroup.controls['name'].setValue('Peter');
      comp.formGroup.controls['age'].setValue(88);
      comp.formGroup.controls['weight'].setValue(188);

      comp['updateIsFormValid']();

      expect(comp.isFormValid).toBe(true);
    });
  });

  describe('resetForm', () => {
    it('should reset the form and selectedFriendNames', () => {
      comp['buildForm']();
      comp.formGroup.controls['name'].setValue('Peter');
      comp.formGroup.controls['age'].setValue(88);
      comp.formGroup.controls['weight'].setValue(188);
      comp.selectedFriendNames = ['Abby', 'Brie', 'Taylor'];
      comp.formGroup.markAsTouched();

      const resetFormSpy = jest.spyOn(comp['formElem'], 'resetForm');

      comp['resetForm']();
      comp.formGroup.reset();

      expect(comp.selectedFriendNames).toEqual([]);
      expect(resetFormSpy).toHaveBeenCalledWith();
      expect(comp.formGroup.touched).toBe(false);
      expect(comp.formGroup.value).toEqual({
        name: null,
        age: null,
        weight: null,
        friendNameInput: null,
      });
    });
  });
});
