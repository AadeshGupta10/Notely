const { noteModel } = require("../model/note_model");
const { userModel } = require("../model/user_model");

const handleAddNote = async (req, res) => {
    try {
        const { _id } = req.user;
        await noteModel.create({ ...req.body, createdBy: _id })
        res.status(201).send("Note Added Successfully")
    }
    catch {
        res.status(500).send("Invalid Token")
    }
}

const handleEditNote = async (req, res) => {
    try {
        const { _id } = req.user;

        const { id, ...rest } = req.body;
        const data = await noteModel.findById(id, { _id: 0, title: 1, description: 1, tags: 1 })
        // const temp_data = await noteModel.findById(id, { _id: 0, createdAt: 1, pin: 1 })

        // const createdAt = JSON.stringify(temp_data.createdAt) //Not Working

        if (JSON.stringify(rest) !== JSON.stringify(data)) {

            await noteModel.findByIdAndUpdate(id, rest)

            // Not Working

            // if (temp_data.pin) {
            //     await userModel.findByIdAndUpdate(_id, {
            //         $pull: {
            //             pin_order: createdAt
            //         }
            //     })

            //     await userModel.findByIdAndUpdate(_id, {
            //         $push: {
            //             pin_order: {
            //                 $each: [createdAt],
            //                 $position: 0
            //             }
            //         }
            //     })
            // }

            return res.status(200).send(`Note with id: ${req.body._id} is Edited`);
        }
        else {
            console.log("Nhi hua")
            return res.status(200).send(`Note with id is Not Updated as the data is matched with server data`);
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Error in Editing Note.");
    }
}

const handleDeleteNote = async (req, res) => {
    try {
        await userModel.findByIdAndUpdate(req.user._id, {
            $pull: {
                pin_order: req.body.createdAt
            }
        });
        await noteModel.findByIdAndDelete(req.body.id)
        res.status(200).send(`Note with id: ${req.body.id} is Deleted`);
    }
    catch {
        res.status(500).send("Error in Deleting Note.");
    }
}

const handlePinUnpinNote = async (req, res) => {

    try {
        const { _id } = req.user;

        const { id, pin, createdAt } = req.body;

        var pinned, unpinned;

        pin ?
            pinned = await userModel.findByIdAndUpdate(_id, {
                $push: {
                    pin_order: {
                        $each: [createdAt],
                        $position: 0
                    }
                }
            })
            :
            unpinned = await userModel.findByIdAndUpdate(_id, {
                $pull: {
                    pin_order: createdAt
                }
            })

        await noteModel.findByIdAndUpdate(id, { "pin": pin })
        res.status(200).send(`Note with id: ${req.body.id} is ${pin ? "Pinned" : "Unpinned"} and Pinned: ${pinned} Unpinned:${unpinned}`);
    }
    catch {
        res.status(500).send("Error in Pinning and Unpining Note.");
    }
}

module.exports = {
    handleAddNote,
    handleEditNote,
    handleDeleteNote,
    handlePinUnpinNote,
}