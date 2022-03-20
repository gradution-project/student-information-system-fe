
const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getAllFacultiesByStatus = async (status) => {
    const apiResult = await fetch(`${SIS_API_URL}/faculty?status=${status}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getFacultyByFacultyId = async (facultyId) => {
    const apiResult = await fetch(`${SIS_API_URL}/faculty/${facultyId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveFaculty = async (operationUserId, name) => {
    const apiResult = await fetch(`${SIS_API_URL}/faculty/save`, {
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            facultyInfoRequest: {
                name: name
            }
        }),
        headers: {'Content-Type': 'application/json'},
        method: 'POST'
    });
    return await apiResult.json();
};

const updateFaculty = async (operationUserId, faculty, name) => {
    const apiResult = await fetch(`${SIS_API_URL}/faculty/update/${faculty.facultyId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            facultyInfoRequest: {
                name: name
            }
        }),
    });
    return await apiResult.json();
};

const activateFaculty = async (operationUserId, facultyId) => {
    const apiResult = await fetch(`${SIS_API_URL}/faculty/activate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            facultyId: facultyId
        }),
    });
    return await apiResult.json();
};

const passivateFaculty = async (operationUserId, facultyId) => {
    const apiResult = await fetch(`${SIS_API_URL}/faculty/passivate`, {
        headers: {'Content-Type': 'application/json'},
        method: 'PATCH',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            facultyId: facultyId
        }),
    });
    return await apiResult.json();
};

const deleteFaculty = async (operationUserId, facultyId) => {
    const apiResult = await fetch(`${SIS_API_URL}/faculty/delete`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE',
        body: JSON.stringify({
            operationInfoRequest: {
                userId: operationUserId
            },
            facultyId: facultyId
        }),
    });
    return await apiResult.json();
};


const FacultyController = {
    getAllFacultiesByStatus,
    getFacultyByFacultyId,
    saveFaculty,
    updateFaculty,
    activateFaculty,
    passivateFaculty,
    deleteFaculty
};

export default FacultyController;