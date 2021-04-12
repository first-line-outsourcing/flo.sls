export interface IconikContext {
  appId: string;
  systemDomainId: string;
  caller: {
    id: string;
    email: string;
  };
  appOwner: {
    id: string;
    email: string;
  };
  authToken: string;
  iconikUrl: string;
}
