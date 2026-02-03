export interface BookCreatingResponseDTO{
    book_name: string,
    price: number,
    stock: number
}

export interface CreateBookDTO{
    book_name: string,
    description: string,
    price: number,
    stock: number
}

export interface UpdateBookDTO{
    book_name: string,
    description: string,
    price: number,
    stock: number
}

export interface BookResponseDTO{
    book_name: string,
    description: string,
    price: number,
    stock: number
}