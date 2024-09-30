import { AuthError } from "next-auth";


export class CustomAuthError extends AuthError {
    static type: string;
    constructor(message: any) {
        super();
        this.type = message;
    }
}

export class InvaliEmailPasswordError extends AuthError {
    static type = 'InvaliEmailPassword';
}