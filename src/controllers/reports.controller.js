exports.getAllReports = (req, res, next) => {

    try {

        //const { id, name, year} = req.query;

        const Report = [
            {id: 1 , name: "Report1" , year: 2020}
            , {id: 2 , name: "Report2" , year: 2021}
        ];

        return res.json(Report);

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

};

exports.getReportById = (req, res, next) => {

    try {

        const id = +req.params.id;

        const reports = [
            {id: 1 ,name: "Report1" , year: 2020}
            , {id: 2 ,name: "Report2" , year: 2021}
        ];

        const report = reports.find(b => b.id === id);

        if(!report) {
            const error = new Error();
            error.httpStatusCode = 404;
            throw error;
        }

        return res.json(report);

    } catch (error) {
        error.httpStatusCode = error.httpStatusCode || 500;
        return next(error);
    }

}