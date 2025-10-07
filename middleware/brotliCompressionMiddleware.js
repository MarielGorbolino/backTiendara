import compression from "compression";
import zlib from "zlib"

export const brotliCompression = compression({
    filter: (req,res)=>{
        if(req.header["x-no-compression"]){
            return false
        }
        return compression.filter(req,res)
    },
    threshold:5000,
    brotli:{
        enabled:true,
        params:{
            [zlib.constants.BROTLI_PARAM_QUALITY]:6
        }
    }
})