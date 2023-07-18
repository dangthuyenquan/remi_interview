db.createUser(
    {
        user: "root",
        roles: [
            {
                role: "readWrite",
                db: "database_test"
            }
        ]
    }
)