const Org = require('../models/org')
const logger = require('../utils/logger')

class Seeder
{
    static defaultCompany () {
        Org.find({ _id: 'vaultressorg' })
            .then(org => {
                if (org.length === 0) {
                    const org = new Org({
                        _id: 'vaultressorg',
                        orgName: 'Vault',
                        // orgLogo: Add the data for the logo

                    })
                    org.save()
                        .then(result => {
                            logger.info(`Default company inserted with id ${result._id}`)
                        })
                        .catch(err => {
                            logger.error(`Could not insert default company ${err}`)
                        })
                }
            })
    }
}

module.exports = Seeder