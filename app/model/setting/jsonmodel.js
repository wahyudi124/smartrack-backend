let datas;

module.exports = {
    set : (profile, oid) => {
         datas = {
            
            id : profile.id,
            enable : profile.enable,
            snmp_version : profile.snmp_version,
            snmp_port : profile.snmp_port,
            read_comunity : profile.read_comunity,
            write_comunity : profile.write_comunity,
            sysoid : profile.sysoid,
            list_MIB : oid
        }
        return datas;
    },

    get : () => {
        if(!datas) {
            throw new Error('data not Set');
        }
        return datas;
    } 
}