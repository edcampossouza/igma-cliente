import { ClienteModel } from "@prisma/client"

export const mockClientes: ClienteModel[] = [
    { id: 1, cpf: '48890301074', dataDeNascimento: new Date("2000-10-02"), nome: "cli 1" },
    { id: 2, cpf: '17497259083', dataDeNascimento: new Date("1999-02-02"), nome: "cli 2" },
    { id: 3, cpf: '93321461013', dataDeNascimento: new Date("2010-03-02"), nome: "cli 3" },
    { id: 4, cpf: '11144477735', dataDeNascimento: new Date("2015-05-03"), nome: "cli 4" },
]