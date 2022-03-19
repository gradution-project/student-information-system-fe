const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;
const SIS_FE_URL = process.env.NEXT_PUBLIC_SIS_FE_URL;

const getAllExamScheduleFilesDetailByFacultyId = async (facultyId) => {
    const apiResult = await fetch(`${SIS_API_URL}/exam-schedule-file/faculty/${facultyId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getExamScheduleFileDetailByExamScheduleFileId = async (departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/exam-schedule-file/department/${departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveExamScheduleFile = async (examScheduleFileRequest) => {

    examScheduleFileRequest.append('apiUrl', SIS_API_URL);

    const apiResult = await fetch(`${SIS_API_URL}/exam-schedule-file/save`, {
        body: examScheduleFileRequest,
        method: 'POST'
    });
    return await apiResult.json();
};

const deleteExamScheduleFile = async (departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/exam-schedule-file/delete/department/${departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE'
    });
    return await apiResult.json();
};


const ExamScheduleFileController = {
    getAllExamScheduleFilesDetailByFacultyId,
    getExamScheduleFileDetailByExamScheduleFileId,
    saveExamScheduleFile,
    deleteExamScheduleFile
};

export default ExamScheduleFileController;