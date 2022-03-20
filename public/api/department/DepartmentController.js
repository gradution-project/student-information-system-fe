
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getAllDepartmentsByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/department?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getDepartmentByDepartmentId = async (departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/department/${departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveDepartment = async (operationUserId, facultyId, preparatoryClass, name, totalClassLevel) => {
    const apiResult = await fetch(`${SIS_API_URL}/department/save`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            departmentInfoRequest: {
                facultyId: facultyId,
                isTherePreparatoryClass: preparatoryClass,
                name: name,
                totalClassLevel: totalClassLevel
            }
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const updateDepartment = async (operationUserId, department,
                                facultyId, isTherePreparatoryClass, name, totalClassLevel) => {

    const apiResult = await fetch(`${SIS_API_URL}/department/update/${department.departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            departmentInfoRequest: {
                facultyId: facultyId,
                isTherePreparatoryClass: isTherePreparatoryClass,
                name: name,
                totalClassLevel: totalClassLevel
            },
            operationInfoRequest: {
                userId: operationUserId
            }
        }),
    });
    return await apiResult.json();
};

const activateDepartment = async (operationUserId, departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/department/activate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            departmentId: departmentId
        }),
    });
    return await apiResult.json();
};

const passivateDepartment = async (operationUserId, departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/department/passivate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            departmentId: departmentId
        }),
    });
    return await apiResult.json();
};

const deleteDepartment = async (operationUserId, departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/department/delete`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            departmentId: departmentId
        }),
    });
    return await apiResult.json();
};


const DepartmentController = {
    getAllDepartmentsByStatus,
    getDepartmentByDepartmentId,
    saveDepartment,
    updateDepartment,
    activateDepartment,
    passivateDepartment,
    deleteDepartment
};

export default DepartmentController;