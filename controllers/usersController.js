import Product from "../models/productModel.js";
import User from "../models/userModel.js";



// const FILE_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpeg',
//     'image/jpg': 'jpg',
//     'video/mp4': 'mp4'
// }

// export const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const isValid = FILE_TYPE_MAP[file.mimetype];
//         let uploadError = new Error('invalid image type');

//         if (isValid) {
//             uploadError = null
//         }
//         cb(uploadError, 'C:/Users/EPHREM B/VISION/client/public/uploads')
//     },
//     filename: function (req, file, cb) {
//         const newfile = file.originalname.split(" ").join("_")
//         cb(null, newfile)
//     }
// })




export const useraddress = async (req, res) => {
    const userId = req.params.id; // User ID
    const addresses = req.body; // List of address objects

    try {
        const user = await User.findById(userId); // Use User model
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Loop through the addresses and push each address object to user's addresses
        addresses.forEach(({ name, address, city, state, country, pin, phone }) => {
            user.addresses.push({ name, address, city, state, country, pin, phone });
        });

        await user.save();

        res.json({ message: 'Addresses added successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}




export const getalladdress = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: 'user not found' });
        }
        const Alladdres = user.addresses
        return res.status(200).json(Alladdres);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const usersList = await userModel.find({});
        if (!usersList) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        return res.status(200).json({ usersList });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProducts = async (req, res) => {
    const file = req.file;
    let imagesPaths = [];
    const files = req.files
    const img = req.body.images

    try {
        for (let pic of img) {
            imagesPaths.push(pic)
        }

        if (files) {
            files.map(file => {
                if (!imagesPaths.includes(file.filename)) {
                    imagesPaths.push(file.filename);
                }
            })
        }
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {

                name: req.body.name,
                description: req.body.description,
                images: imagesPaths,
                mrp: req.body.mrp,
                category: req.body.category,
                InStock: req.body.InStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found or cannot be updated.' });
        }
        res.json({ message: 'Product updated successfully', updatedProduct: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteproduct = async (req, res) => {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "product not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
}