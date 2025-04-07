export interface CrearInvernadero {
    invernaderoId: string;
    Nombre: string;
    NombrePlanta: string;
    TipoPlanta: string;
    MinTemperatura: number;
    MaxTemperatura: number;
    MinHumedad: number;
    MaxHumedad: number;
    Usuarios: string[];
    Sensores: string[];
}