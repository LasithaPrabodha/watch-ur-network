import { ForceDirectedGraph } from '@wyn/ui-chart-cards';
import { FormState, UserEntity } from '@wyn/ui-shared';

export interface UsersState {
  users: UserEntity[];
  friendsGraph: ForceDirectedGraph;
  formState: FormState;
}
