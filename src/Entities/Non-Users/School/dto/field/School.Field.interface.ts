import IField from '../../../Park/Field.interface'
import CameraDto from './camera/Camera.dto'

export interface ISchoolField extends IField {
    cameras: CameraDto[]
}
