<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pais;
use Illuminate\Support\Facades\Validator;

class PaisController extends Controller
{
    function index() {
        $paises = Pais::all();
        
        // Reponde un array a pelo
        //return response()->json($paises);
        // Responde con un array pero con un atributo asi podemos identificar la respuesta
        return response()->json(['paises' => $paises]);
    }
    
    function store(Request $request) {
        //validar
        $validator = Validator::make($request->all(), [
            'code' => 'required|max:3|min:3|unique:pais,code',
            'name' => 'required|max:100|unique:pais,name',
        ]);
        /*if($validator->passes()) {
            
        }*/
        if($validator->fails()) {
            $respuesta = ['result' => -1, 'message' => $validator->getMessageBag()];
        } else {
            try {
                $pais = new Pais($request->all());
                $pais->save();
                $respuesta = [
                                'result' => 1,
                                'message' => 'País insertado correctamente.',
                                'paises' => Pais::all()
                            ];
            } catch(\Exception $e) {
                $respuesta = ['result' => -2, 'message' => $e];
            }
        }
        //intentar insertar
        return response()->json($respuesta);
    }
    
    function update(Request $request, $code) {
        $pais = Pais::find($code);
        
        //validar
        $validator = Validator::make($request->all(), [
            'code' => 'required|max:3|min:3',
            'name' => 'required|max:100',
        ]);
        /*if($validator->passes()) {
            
        }*/
        if($validator->fails()) {
            $respuesta = ['result' => -1, 'message' => $validator->getMessageBag()];
        } else {
            try {
                $pais->update($request->all());
                $respuesta = [
                                'result' => 1,
                                'message' => 'País editado correctamente.',
                                'paises' => Pais::all()
                            ];
            } catch(\Exception $e) {
                $respuesta = ['result' => -2, 'message' => $e];
            }
        }
        
        return response()->json($respuesta);
    }
    
    function show(Request $request, $code) {
        // Buscamos el pais mediante su codigo y devolvemos sus datos en JSON
        $pais = Pais::find($code);
        return response()->json(['pais' => $pais]);
    }
    
    function destroy($code) {
        $pais = Pais::find($code);
        // Eliminamos el pais
            try {
                $pais->delete();
                $respuesta = [
                                'result' => 1,
                                'message' => 'País eliminado correctamente.',
                                'paises' => Pais::all()
                            ];
            } catch(\Exception $e) {
                $respuesta = ['result' => -2, 'message' => $e];
            }
        return response()->json($respuesta);
    }
}
