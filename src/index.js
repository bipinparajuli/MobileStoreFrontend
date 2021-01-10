import React from "react"
import Routes from "./Routes"
import ReactDom from 'react-dom'
import { StateProvider } from "./core/stateProvider"
import Reducer,{initialState} from './core/Reducer'
ReactDom.render(
<StateProvider initialState={initialState} reducer={Reducer}>
<Routes />
</StateProvider>
, document.getElementById("root"))