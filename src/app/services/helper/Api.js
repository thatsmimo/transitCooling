import {Config} from '@common'
import NetworkUtils from './NetworkUtils'

const Api = new NetworkUtils({
  baseUrl:Config.MagentoConfig.baseUrl + "/index.php/rest"
})

export default Api
