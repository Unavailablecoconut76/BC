
import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../datab/db.js';

// ==============================
// 2. Define the Models
// ==============================

// Table: Users
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    wallet_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Crucial: This links your SQL user to the Blockchain
    },
    role: {
        type: DataTypes.ENUM('govt', 'Buyer', 'Seller'),
        defaultValue: 'Buyer'
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

// Table: Land_Parcels
const LandParcel = sequelize.define('LandParcel', {
    current_owner_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parcel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Using JSON for coordinates allows flexibility (e.g., storing an array of lat/long points)
    coordinates: {
        type: DataTypes.JSON, 
        allowNull: true
    },
    area_size: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    address_line: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_govt_land: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
    // Note: You might want to add an 'owner_id' FK here later to link to User!
});

// Table: Documents
const Document = sequelize.define('Document', {
    doc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ipfs_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Stores the hash from Pinata/IPFS"
    },
    upload_timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
});

// Table: Notifications
const Notification = sequelize.define('Notification', {
    notif_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Unread', 'Read'),
        defaultValue: 'Unread'
    }
});

// ==============================
// 3. Define Relationships (Associations)
// ==============================

// Users <-> Notifications
User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

// Land_Parcels <-> Documents
LandParcel.hasMany(Document, { foreignKey: 'parcel_id' });
Document.belongsTo(LandParcel, { foreignKey: 'parcel_id' });

// Optional: Users <-> Land_Parcels (Ownership)
// Assuming a user owns a parcel, we can link them:
User.hasMany(LandParcel, { foreignKey: 'current_owner_id' });
LandParcel.belongsTo(User, { as: 'Owner', foreignKey: 'current_owner_id' });

// ==============================
// 4. Sync and Export
// ==============================

export {
    sequelize,
    User,
    LandParcel,
    Document,
    Notification
};

// If the tables ALREADY exist (Running it a 2nd, 3rd time):

// Sequelize checks the database, sees the tables are there, 
// and does nothing.
// Your data is SAFE. It will not delete records.
// Your columns will NOT update. 
// Warning: If you add a new field (like phone_number) to your JS code
//  but the table already exists in Postgres, Sequelize will ignore 
// the new field. It won't error, but it won't save that data either.