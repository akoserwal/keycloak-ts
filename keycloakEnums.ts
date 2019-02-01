export enum KeycloakFlow {
    STANDARD='standard',
    IMPLICIT='implicit',
    HYBRID='hybrid'
}

export enum KeycloakResponseType{
    CODE='code',
    ID_TOKEN_TOKEN='id_token_token',
    CODE_ID_TOKEN_TOKEN='code_id_token_token',
}

export enum KeycloakResponseMode {
    QUERY='query',
    FRAGEMNT='fragment'
}

export enum KeycloakOnLoad{
    LoginRequired='login-required',
    CheckSso='check-sso'
}

export type KeycloakAdapterName = 'cordova'|'default' | any;