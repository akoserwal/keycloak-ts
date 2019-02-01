interface KeycloakLoginOptions {
		/**
		 * @private Undocumented.
		 */
		scope?: string;

		/**
		 * Specifies the uri to redirect to after login.
		 */
		redirectUri?: string;

		/**
		 * By default the login screen is displayed if the user is not logged into
		 * Keycloak. To only authenticate to the application if the user is already
		 * logged in and not display the login page if the user is not logged in, set
		 * this option to `'none'`. To always require re-authentication and ignore
		 * SSO, set this option to `'login'`.
		 */
		prompt?: 'none'|'login';

		/**
		 * If value is `'register'` then user is redirected to registration page,
		 * otherwise to login page.
		 */
		action?: 'register';

		/**
		 * Used just if user is already authenticated. Specifies maximum time since
		 * the authentication of user happened. If user is already authenticated for
		 * longer time than `'maxAge'`, the SSO is ignored and he will need to
		 * authenticate again.
		 */
		maxAge?: number;

		/**
		 * Used to pre-fill the username/email field on the login form.
		 */
		loginHint?: string;

		/**
		 * Used to tell Keycloak which IDP the user wants to authenticate with.
		 */
		idpHint?: string;

	        /**
		 * Sets the 'ui_locales' query param in compliance with section 3.1.2.1
                 * of the OIDC 1.0 specification.
		 */
		locale?: string;
                
                /**
		 * Specifies the desired Keycloak locale for the UI.  This differs from
                 * the locale param in that it tells the Keycloak server to set a cookie and update
                 * the user's profile to a new preferred locale.
		 */
		kcLocale?: string;
	}

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