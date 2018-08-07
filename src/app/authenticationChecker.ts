

export class CustomAuthenticationChecker{

    public static  checkAuthentication():CheckAuthenticationResult{
        var token=sessionStorage.getItem("access_token");
        if(token != null){
            return new CheckAuthenticationResult(true, token);
        }
        return new CheckAuthenticationResult(false, null);
    }

}

export class CheckAuthenticationResult {

    constructor(isAuthenticated:boolean,access_token:string){
        this.isAuthenticated = isAuthenticated;
        this.access_token = access_token;
    }
    public isAuthenticated:boolean;
    public access_token:string;
}