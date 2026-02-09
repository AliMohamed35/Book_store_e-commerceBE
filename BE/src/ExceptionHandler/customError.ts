export class ResourceNotFoundError extends Error {
    constructor(message = "Not found!"){
        super(message);
    }
}

export class UserAlreadyExistError extends Error {
    constructor(message = "User Already exist!"){
        super(message)
    }
}

export class InvalidCredentialsError extends Error {
    constructor(message = "Invalid credentials!"){
        super(message);
    }
}

export class BadRequestError extends Error {
    constructor(message = "Invalid credentials!"){
        super(message);
    }
}

export class EmailSendError extends Error {
    constructor(message = "Email not sent!"){
        super(message);
    }
}
