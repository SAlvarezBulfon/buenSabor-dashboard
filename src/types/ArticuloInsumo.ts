import Imagenes from "./IImagenes";
import UnidadMedida from "./UnidadMedida";

interface IArticuloInsumo {
    id: number;
    denominacion: string;
    precioVenta: number;
    imagenes: Imagenes [];
    unidadMedida: UnidadMedida;
    precioCompra: number;
    stockActual: number;
    stockMaximo: number;
    esParaElaborar: boolean;
  }

export default IArticuloInsumo;