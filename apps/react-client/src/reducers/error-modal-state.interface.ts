/**
 * This represents state of error notification modal
 * which is used for global/common error notifications.
 */
export interface ErrorModalState {
  readonly errorModalIsShown: boolean;
  readonly errorMessage?: string;
}
