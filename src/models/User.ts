

export class User{
    id: string;
    name: string;
    lastName: string;
    CPF: string;
    email: string;
    updatedAt: string;
    deletedAt?: string;


    constructor(
        id: string = '',
        name: string = '',
        lastName: string = '',
        CPF: string = '',
        email: string = '',
        updatedAt: string = '',
        deletedAt: string
    ) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.CPF = CPF;
        this.email = email;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    printUserInfo(): void {
        console.log(`User Info:
        ID: ${this.id}
        Name: ${this.name} ${this.lastName}
        CPF: ${this.CPF}
        Email: ${this.email}
        UpdatedAt: ${this.updatedAt}
        DeletedAt: ${this.deletedAt}`);
    }


}