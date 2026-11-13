import Food from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new Food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Added"
        })
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }

}

// all food list

const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({
            success: true,
            data: foods
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })        
    }
}

// remove food item

const removeFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.body.id);
        fs.unlink(`uploads/${food.image}`, 
            (err) => {
                if (err) console.log(err);
            }
        )
        
        res.json({success: true, message: "Food Removed"})
    } catch (error) {
        res.json({
            success: false,
            message: "Error"
        })
    }
}

export {addFood, listFood, removeFood}