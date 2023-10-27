import User from '../models/schema';
exports.register = async (req, res) => {
const createUser= async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).send('User already exists...');
            return null; // Return null to indicate an error
        }

        user = new User({
            name: req.body.name,
            email: req.body.email,
            
        });

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        user.email = await bcrypt.hash(user.email, salt);

        user = await user.save();
        return user;
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error on user creation ');
        return null; // Return null to indicate an error
    }
};

createUser()

}
