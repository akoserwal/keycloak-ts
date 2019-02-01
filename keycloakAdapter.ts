interface KeycloakAdapter {
    login(options?: KeycloakLoginOptions): KeycloakPromise<void, void>;
    logout(options?: any): KeycloakPromise<void, void>;
    register(options?: KeycloakLoginOptions): KeycloakPromise<void, void>;
    accountManagement(): KeycloakPromise<void, void>;
    redirectUri(options: { redirectUri: string; }, encodeHash: boolean): string;
}