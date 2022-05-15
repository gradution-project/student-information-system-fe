const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllExamScheduleFilesDetailByFacultyId = async (facultyId) => {
    const apiResult = await fetch(`${SIS_API_URL}/exam/schedule/files/by/faculty/${facultyId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getExamScheduleFileDetailByDepartmentId = async (departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/exam/schedule/file/by/department/${departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveExamScheduleFile = async (examScheduleFileRequest) => {
    const apiResult = await fetch(`${SIS_API_URL}/exam/schedule/file`, {
        body: examScheduleFileRequest,
        method: 'POST'
    });
    return await apiResult.json();
};

const deleteExamScheduleFile = async (departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/exam/schedule/file/by/department/${departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE'
    });
    return await apiResult.json();
};


const ExamScheduleFileController = {
    getAllExamScheduleFilesDetailByFacultyId,
    getExamScheduleFileDetailByDepartmentId,
    saveExamScheduleFile,
    deleteExamScheduleFile
};

export default ExamScheduleFileController;