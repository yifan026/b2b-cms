/**
 * Created by YFC on 2018/11/29 上午 9:37
 */

module.exports = function (Dashboard) {


    Dashboard.ageDistribution = function (cb) {
        let ds = Dashboard.app.datasources.b2b;

        let sql = "SELECT * FROM dashboard_age_distribution";

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }

        });

    };

    Dashboard.remoteMethod(
        'ageDistribution', {
            http: {
                path: '/ageDistribution',
                verb: 'get'
            },
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


    Dashboard.genderDistribution = function (cb) {
        let ds = Dashboard.app.datasources.b2b;

        let sql = "SELECT gender,count(*) num , cast((count(*)*100/(select count(*) from usr_channel_members_profile)) as dec(5)) percentage FROM usr_channel_members_profile GROUP by gender;";

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }

        });

    };

    Dashboard.remoteMethod(
        'genderDistribution', {
            http: {
                path: '/genderDistribution',
                verb: 'get'
            },
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


    Dashboard.customerDistribution = function (gender, cb) {
        let ds = Dashboard.app.datasources.b2b;

        gender = gender.toUpperCase();

        let sql = `select count(*) customer, DATE_FORMAT(insert_time, "%Y-%m") per_month 
        from  usr_channel_members WHERE gender='${gender}' group by DATE_FORMAT(insert_time, "%Y-%m")`;


        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }

        });

    };

    Dashboard.remoteMethod(
        'customerDistribution', {
            http: {
                path: '/customerDistribution',
                verb: 'post'
            },
            accepts: {arg: 'gender', type: 'string'},
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


    Dashboard.skinTypeDistribution = function (gender, cb) {
        let ds = Dashboard.app.datasources.b2b;

        gender = gender.toUpperCase();

        let sql = `select * from dashboard_skin_type_distribution where gender='${gender}'`;

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }

        });

    };

    Dashboard.remoteMethod(
        'skinTypeDistribution', {
            http: {
                path: '/skinTypeDistribution',
                verb: 'post'
            },
            accepts: {arg: 'gender', type: 'string'},
            returns: {
                root: true,
                type: 'object'
            }
        }
    );


    Dashboard.avgSkinDistribution = function (ageGroup, factor, gender, cb) {

        let ds = Dashboard.app.datasources.b2b;
        ageGroup = ageGroup.toUpperCase();
        factor = factor.toLowerCase();
        gender = gender.toUpperCase();


        let sql = `SELECT avg(type_value) avg,per_month FROM dashboard_avg_skin_measurement where factor="${factor}"`;
        let age = ageGroup.split('-');
        let a1 = age[0];
        let a2 = age[1];

        // console.log('1',sql);

        if (gender != "ALL" && ageGroup == "ALL") {

            sql += ` and gender="${gender}" group by per_month`;

            console.log('1', sql);
        }
        else if (ageGroup != "ALL" && gender == "ALL") {

            sql += ` and age between ${a1} and ${a2} group by per_month`;

            console.log('2', sql);

        } else {

            sql += ` and age between ${a1} and ${a2} and gender="${gender}" group by per_month`;

            console.log('3', sql);
        }

        ds.connector.execute(sql, [], function (err, res) {

            if (err) {
                cb(err, null);
            } else {
                cb(null, res);
            }

        });

    };

    Dashboard.remoteMethod(
        'avgSkinDistribution', {
            http: {
                path: '/avgSkinDistribution',
                verb: 'post'
            },
            accepts: [
                {arg: 'ageGroup', type: 'string'},
                {arg: 'factor', type: 'string'},
                {arg: 'gender', type: 'string'}
            ],
            returns: {
                root: true,
                type: 'object'
            }
        }
    );

};