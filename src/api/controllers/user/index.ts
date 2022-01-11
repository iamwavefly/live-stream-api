import {Request, Response} from "express";

export const all = async (req: Request, res: Response) => {
    return res.status(200).json({
        status: "success",
        status_code: 100,
        message: "Fetch all user"
    })
}
export const user = async (req: Request, res: Response) => {
    const {id} = req.params
    if(!id || typeof id === undefined){
        return res.status(403).json({
            status: "fail",
            status_code: 105,
            message: "Invalid user id passed"
        })
    }
    return res.status(200).json({
        status: "success",
        status_code: 100,
        message: "Fetch user"
    })
}