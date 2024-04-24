import ArticuloInsumo from "./ArticuloInsumo";

interface IArticuloManufacturadoDetalle {
    id: number;
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
}

export default IArticuloManufacturadoDetalle;