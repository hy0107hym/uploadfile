const Models = require('../model/index')
const fs = require('fs')

exports.paginateItem = async (req, res) => {
    try {
        const activePage = +req.query.activePage
        const limit = +req.query.limit
        const skip = (activePage - 1) * limit
        const totalRecord = await Models.countDocuments({})
        const totalPage = Math.ceil(totalRecord / limit)
        const listData = await Models.find({}).limit(limit).skip(skip)
        res.send({ listData, totalPage, status: "success" })
    } catch (error) {
        res.send("status: failure")
    }
}

exports.searchItem = async (req, res) => {
    try {
        const activePage = +req.query.activePage
        const limit = +req.query.limit
        const skip = (activePage - 1) * limit
        const totalRecord = await Models.countDocuments({ name: { $regex: req.query.textSearch, $options: "i" } })
        const totalPage = Math.ceil(totalRecord / limit)
        const listData = await Models.find({ name: { $regex: req.query.textSearch, $options: "i" } }).limit(limit).skip(skip)
        res.send({ listData, totalPage, status: "success" })
    } catch (error) {
        res.send({ status: "failure" })
    }
}

exports.addItem = async (req, res) => {
    try {
        const fileImg = req.files
        let arrImg = []
        for (let i = 0; i < fileImg.length; i++) {
            const url = `http://localhost:3001/${fileImg[i].filename}`
            arrImg.push(url)
        }
        await Models.create({ name: req.body.name, img: arrImg, time: Date.now() })
        res.send({ status: "success" })
    } catch (error) {
        res.send({ status: "failure" })
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const data = await Models.findByIdAndDelete(req.params.id)
        for (let i = 0; i < data.img.length; i++) {
            fs.unlinkSync(`media/${data.img[i].slice(22)}`)
        }
        res.send({ status: "success" })
    } catch (error) {
        res.send({ status: "failure" })
    }
}

exports.updateItem = async (req, res) => {
    try {
        const fileImg = req.files
        let arrImg = []
        for (let i = 0; i < fileImg.length; i++) {
            const url = `http://localhost:3001/${fileImg[i].filename}`
            arrImg.push(url)
        }
        if (fileImg.length === 0) {
            await Models.findByIdAndUpdate(req.params.id, { name: req.body.name })
        } else {
            const data = await Models.findByIdAndUpdate(req.params.id, { name: req.body.name, img: arrImg })
            for (let i = 0; i < data.img.length; i++) {
                fs.unlink(`media/${data.img[i].slice[22]}`, () => { })
            }
        }
        res.send({ status: "success" })
    } catch (error) {
        res.send({ status: "failure" })
    }
}

exports.deleteOneItem = async (req, res) => {
    try {
        const id = req.query.id
        const index = req.query.index
        const Item = await Models.findById(id)
        fs.unlinkSync(`media/${Item.img[index].slice(22)}`)
        await Item.img.splice(index, 1)
        await Models.findByIdAndUpdate(id, { img: Item.img })
        res.send({ message: 'xóa thành công' })
    } catch (error) {
        res.send({ message: "xóa lỗi" })
    }
}
