export class UserDto {
  email: string = ''
  id: string = ''
  isActivated: string = ''

  // eslint-disable-next-line
  constructor(model: any) { // update this
    this.email = model.email
    this.id = model._id
    this.isActivated = model.isActivated
  }
}
