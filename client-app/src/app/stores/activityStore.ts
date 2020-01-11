import { observable } from 'mobx'
import { createContext } from "react"

class ActivityStore {
    @observable title = 'from Mobx'
}

export default createContext(new ActivityStore())