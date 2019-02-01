import {KeycloakResponseType, KeycloakResponseMode, KeycloakFlow} from './keycloakEnums';

interface KeycloakInstance {
    /**
     * Is true if the user is authenticated, false otherwise.
     */
    authenticated?: boolean;

    /**
     * The user id.
     */
    subject?: string;

    /**
     * Response mode passed in init (default value is `'fragment'`).
     */
    responseMode?: KeycloakResponseMode;

    /**
     * Response type sent to Keycloak with login requests. This is determined
     * based on the flow value used during initialization, but can be overridden
     * by setting this value.
     */
    responseType?: KeycloakResponseType;

    /**
     * Flow passed in init.
     */
    flow?: KeycloakFlow;

    /**
     * The realm roles associated with the token.
     */
    realmAccess?: { roles: string[] };

    /**
     * The resource roles associated with the token.
     */
    resourceAccess?: string[];

    /**
     * The base64 encoded token that can be sent in the Authorization header in
     * requests to services.
     */
    token?: string;

    /**
     * The parsed token as a JavaScript object.
     */
    tokenParsed?: {
        exp?: number;
        iat?: number;
        nonce?: string;
        sub?: string;
        session_state?: string;
        realm_access?: { roles: string[] };
        resource_access?: string[];
    };

    /**
     * The base64 encoded refresh token that can be used to retrieve a new token.
     */
    refreshToken?: string;

    /**
     * The parsed refresh token as a JavaScript object.
     */
    refreshTokenParsed?: { nonce?: string };

    /**
     * The base64 encoded ID token.
     */
    idToken?: string;

    /**
     * The parsed id token as a JavaScript object.
     */
    idTokenParsed?: { nonce?: string };

    /**
     * The estimated time difference between the browser time and the Keycloak
     * server in seconds. This value is just an estimation, but is accurate
     * enough when determining if a token is expired or not.
     */
    timeSkew?: number;

    /**
     * @private Undocumented.
     */
    loginRequired?: boolean;

    /**
     * @private Undocumented.
     */
    authServerUrl?: string;

    /**
     * @private Undocumented.
     */
    realm?: string;

    /**
     * @private Undocumented.
     */
    clientId?: string;

    /**
     * @private Undocumented.
     */
    clientSecret?: string;

    /**
     * @private Undocumented.
     */
    redirectUri?: string;

    /**
     * @private Undocumented.
     */
    sessionId?: string;

    /**
     * @private Undocumented.
     */
    profile?: KeycloakProfile;

    /**
     * @private Undocumented.
     */
    userInfo?: {}; // KeycloakUserInfo;

    /**
     * Called when the adapter is initialized.
     */
    onReady?(authenticated?: boolean): void;

    /**
     * Called when a user is successfully authenticated.
     */
    onAuthSuccess?(): void;

    /**
     * Called if there was an error during authentication.
     */
    onAuthError?(errorData: KeycloakError): void;

    /**
     * Called when the token is refreshed.
     */
    onAuthRefreshSuccess?(): void;

    /**
     * Called if there was an error while trying to refresh the token.
     */
    onAuthRefreshError?(): void;

    /**
     * Called if the user is logged out (will only be called if the session
     * status iframe is enabled, or in Cordova mode).
     */
    onAuthLogout?(): void;

    /**
     * Called when the access token is expired. If a refresh token is available
     * the token can be refreshed with Keycloak#updateToken, or in cases where
     * it's not (ie. with implicit flow) you can redirect to login screen to
     * obtain a new access token.
     */
    onTokenExpired?(): void;

    /**
     * Called to initialize the adapter.
     * @param initOptions Initialization options.
     * @returns A promise to set functions to be invoked on success or error.
     */
    init(initOptions: KeycloakInitOptions): KeycloakPromise<boolean, KeycloakError>;

    /**
     * Redirects to login form.
     * @param options Login options.
     */
    login(options?: KeycloakLoginOptions): KeycloakPromise<void, void>;

    /**
     * Redirects to logout.
     * @param options Logout options.
     * @param options.redirectUri Specifies the uri to redirect to after logout.
     */
    logout(options?: any): KeycloakPromise<void, void>;

    /**
     * Redirects to registration form.
     * @param options Supports same options as Keycloak#login but `action` is
     *                set to `'register'`.
     */
    register(options?: any): KeycloakPromise<void, void>;

    /**
     * Redirects to the Account Management Console.
     */
    accountManagement(): KeycloakPromise<void, void>;

    /**
     * Returns the URL to login form.
     * @param options Supports same options as Keycloak#login.
     */
    createLoginUrl(options?: KeycloakLoginOptions): string;

    /**
     * Returns the URL to logout the user.
     * @param options Logout options.
     * @param options.redirectUri Specifies the uri to redirect to after logout.
     */
    createLogoutUrl(options?: any): string;

    /**
     * Returns the URL to registration page.
     * @param options Supports same options as Keycloak#createLoginUrl but
     *                `action` is set to `'register'`.
     */
    createRegisterUrl(options?: KeycloakLoginOptions): string;

    /**
     * Returns the URL to the Account Management Console.
     */
    createAccountUrl(): string;

    /**
     * Returns true if the token has less than `minValidity` seconds left before
     * it expires.
     * @param minValidity If not specified, `0` is used.
     */
    isTokenExpired(minValidity?: number): boolean;

    /**
     * If the token expires within `minValidity` seconds, the token is refreshed.
     * If the session status iframe is enabled, the session status is also
     * checked.
     * @returns A promise to set functions that can be invoked if the token is
     *          still valid, or if the token is no longer valid.
     * @example
     * ```js
     * keycloak.updateToken(5).success(function(refreshed) {
     *   if (refreshed) {
     *     alert('Token was successfully refreshed');
     *   } else {
     *     alert('Token is still valid');
     *   }
     * }).error(function() {
     *   alert('Failed to refresh the token, or the session has expired');
     * });
     */
    updateToken(minValidity: number): KeycloakPromise<boolean, boolean>;

    /**
     * Clears authentication state, including tokens. This can be useful if
     * the application has detected the session was expired, for example if
     * updating token fails. Invoking this results in Keycloak#onAuthLogout
     * callback listener being invoked.
     */
    clearToken(): void;

    /**
     * Returns true if the token has the given realm role.
     * @param role A realm role name.
     */
    hasRealmRole(role: string): boolean;

    /**
     * Returns true if the token has the given role for the resource.
     * @param role A role name.
     * @param resource If not specified, `clientId` is used.
     */
    hasResourceRole(role: string, resource?: string): boolean;

    /**
     * Loads the user's profile.
     * @returns A promise to set functions to be invoked on success or error.
     */
    loadUserProfile(): KeycloakPromise<KeycloakProfile, void>;

    /**
     * @private Undocumented.
     */
    loadUserInfo(): KeycloakPromise<{}, void>;
}