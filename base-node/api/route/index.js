const itemController = require('../controller/index')

const Routers = (app) => {
    app.route('/item/paginate').get(itemController.paginateItem)
    app.route('/item/search').get(itemController.searchItem)
    app.route('/item/:id').delete(itemController.deleteItem).put(itemController.updateItem)
    app.route('/item').post(itemController.addItem).delete(itemController.deleteOneItem)
}

module.exports = Routers