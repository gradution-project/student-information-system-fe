const SIS_API_URL = process.env.NEXT_PUBLIC_SIS_API_URL;

const getAllLessonScheduleFilesDetailByFacultyId = async (facultyId) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/schedule/file/by/faculty/${facultyId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const getLessonScheduleFileDetailByLessonScheduleFileId = async (departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/schedule/file/by/department/${departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    return await apiResult.json();
};

const saveLessonScheduleFile = async (lessonScheduleFileRequest) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/schedule/file`, {
        body: lessonScheduleFileRequest,
        method: 'POST'
    });
    return await apiResult.json();
};

const deleteLessonScheduleFile = async (departmentId) => {
    const apiResult = await fetch(`${SIS_API_URL}/lesson/schedule/file/by/department/${departmentId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE'
    });
    return await apiResult.json();
};


const LessonScheduleFileController = {
    getAllLessonScheduleFilesDetailByFacultyId,
    getLessonScheduleFileDetailByLessonScheduleFileId,
    saveLessonScheduleFile,
    deleteLessonScheduleFile
};

export default LessonScheduleFileController;