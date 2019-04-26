let datas;

module.exports = {
    set : (profile,protocol,availabledata) => {
         datas = {
            id : profile.id,
            name : profile.name,
            manufacturer : profile.manufacturer,
            part_number : profile.part_number,
            serial_number : profile.serial_number,
            supplier : profile.supplier,
            supplier_contact : profile.supplier_contact,
            installed_by : profile.installed_by,
            installation_date : profile.installation_date,
            protocol : protocol,
            avaiable_data : availabledata
        }
        return datas;
    },

    get : () => {
        if(!datas) {
            throw new Error('data not set');
        }
        return datas;
    } 
}