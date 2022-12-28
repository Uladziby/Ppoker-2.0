import { uid } from "uid"

export function createID():string{
    const lengthId = 3
    return uid(lengthId)
}