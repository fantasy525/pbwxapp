/**
 * Created by zxf on 2018.1.31.
 */
export function isArray(arr){
  if(toString.call(arr)==='[object Array]'){
    return true
  }else{
    return false
  }
}
