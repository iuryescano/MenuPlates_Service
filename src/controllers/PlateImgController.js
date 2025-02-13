const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class PlateImgController {
  async update(request, response) {
    const user_id = request.user.id;
    const { id: plate_id } = request.params; // Obtendo o ID do prato dos parâmetros da URL
    const plateFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Somente usuários autenticados podem mudar a foto do prato", 401);
    }

    const plate = await knex("plates").where({ id: plate_id }).first();

    if (!plate) {
      throw new AppError("Prato não encontrado", 404);
    }

    if (plate.Image) {
      await diskStorage.deleteFile(plate.Image);
    }

    const filename = await diskStorage.saveFile(plateFilename);
    plate.Image = filename;

    await knex("plates").update({ Image: plate.Image }).where({ id: plate_id });

    return response.json(plate);
  }
}

module.exports = PlateImgController;