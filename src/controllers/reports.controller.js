exports.getAllReports = (req, res, next) => {

    try {

        //const { id, name, year} = req.query;

        const Report = [
            {id: 001 , name: "Report1" , year: 2020}
            , {id: 002 , name: "Report2" , year: 2021}
        ];

        return res.json(Report);

    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "Please try again later" });
    }

};