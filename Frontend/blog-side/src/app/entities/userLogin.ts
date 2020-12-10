export class UserLogin {
    private username: string;
    private password: string;

    public get _username(): string {
        return this.username;
    }
    public set _username(value: string) {
        this.username = value;
    }
    public get _password(): string {
        return this.password;
    }
    public set _password(value: string) {
        this.password = value;
    }
}