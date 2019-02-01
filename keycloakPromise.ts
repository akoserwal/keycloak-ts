type KeycloakPromiseCallback<T> = (result: T) => void;

	interface KeycloakPromise<TSuccess, TError> {
		/**
		 * Function to call if the promised action succeeds.
		 */
		success(callback: KeycloakPromiseCallback<TSuccess>): KeycloakPromise<TSuccess, TError>;

		/**
		 * Function to call if the promised action throws an error.
		 */
		error(callback: KeycloakPromiseCallback<TError>): KeycloakPromise<TSuccess, TError>;
	}