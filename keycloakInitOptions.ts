import { KeycloakAdapterName, KeycloakResponseMode, KeycloakOnLoad, KeycloakFlow } from './keycloakEnums';

export interface KeycloakInitOptions {
    /**
     * @private Undocumented.
     */
    useNonce?: boolean;

    /**
     * Allows to use different adapter:
     * 
     * - {string} default - using browser api for redirects
     * - {string} cordova - using cordova plugins 
     * - {function} - allows to provide custom function as adapter.
     */
    adapter?: KeycloakAdapterName;

    /**
     * Specifies an action to do on load.
     */
    onLoad?: KeycloakOnLoad;



    /**
     * Set an initial value for skew between local time and Keycloak server in
     * seconds (only together with `token` or `refreshToken`).
     */
    timeSkew?: number;

    /**
     * Set to enable/disable monitoring login state.
     * @default true
     */
    checkLoginIframe?: boolean;

    /**
     * Set the interval to check login state (in seconds).
     * @default 5
     */
    checkLoginIframeInterval?: number;

    /**
     * Set the OpenID Connect response mode to send to Keycloak upon login.
     * @default fragment After successful authentication Keycloak will redirect
     *                   to JavaScript application with OpenID Connect parameters
     *                   added in URL fragment. This is generally safer and
     *                   recommended over query.
     */
    responseMode?: KeycloakResponseMode;

    /**
     * Set the OpenID Connect flow.
     * @default standard
     */
    flow?: KeycloakFlow;
}

