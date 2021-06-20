import {User} from "../../shared/models/user.model";

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
}
