import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '../../../user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MESSAGE, MONTHS, STATUS } from './users.constant';
import { UpdateUsersDto, UsersResponse, ChartResponse, UsersListResponse } from './dto';
import { Types } from 'mongoose';
import { howMuchDays, responseSuccessful } from '../../../../utils';
import { dataChartProps } from './types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) {}

  dataChart(createDate: any[], selectYears: number, selectMonth: number, indexMonth: number, daysMonth: number) {
    const labels: string[] = [];
    const datasets: number[] = [];
    const monthObj = {
      num: selectMonth,
      name: `${MONTHS.FULL[indexMonth]}, ${selectYears} г.`,
    };

    for (let i = 0; i < daysMonth; i++) {
      let count = 0;
      labels.push(`${i + 1} ${MONTHS.SMALL[indexMonth]}`);

      for (let k = 0; k < createDate.length; k++) {
        const k_date = createDate[k]?.created_date;
        if (i + 1 === k_date.getDate() && selectMonth === k_date.getMonth() + 1) count++;
      }

      datasets.push(count);
      count = 0;
    }

    return { labels, datasets, monthObj };
  }

  async getChart(month?: number): Promise<ChartResponse> {
    const nowDate: Date = new Date();
    let dataChart: dataChartProps = {
      labels: [],
      datasets: [],
      monthObj: { name: '', num: 0 },
    };
    const createDate = await this.userModel.find().select(['created_date']).sort('created_date');

    if (!month || month >= nowDate.getMonth() + 1) {
      const daysMonth: number = nowDate.getDate();
      dataChart = this.dataChart(
        createDate,
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        nowDate.getMonth(),
        daysMonth,
      );
    } else if (nowDate.getMonth() + 1 > month) {
      const daysMonth: number = howMuchDays(nowDate.getFullYear(), month);
      dataChart = this.dataChart(createDate, nowDate.getFullYear(), month, month - 1, daysMonth);
    }

    return responseSuccessful(
      { labels: dataChart.labels, datasets: dataChart.datasets, month: dataChart.monthObj },
      HttpStatus.OK,
      [MESSAGE.SUCCESS_REQUEST_CHART],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }

  async getUsers({ page, perPage }): Promise<UsersListResponse> {
    const users = await this.userModel
      .find()
      .sort('-created_date')
      .select(['_id', 'first_name', 'email', 'phone'])
      .limit(perPage)
      .skip(perPage * (page - 1));

    const total = await this.userModel.count();
    const lastPage = Math.ceil(total / Number(perPage));

    return responseSuccessful(
      { items: users, page: Number(page), per_page: Number(perPage), total: total, last_page: lastPage },
      HttpStatus.OK,
      [MESSAGE.SUCCESS_REQUEST_USERS],
      STATUS.SUCCESS_STATUS_REQUEST,
    );
  }

  async updateUser(id: string, updateData: UpdateUsersDto): Promise<UsersResponse> {
    const objectId = new Types.ObjectId(id);
    const user = await this.userModel
      .findByIdAndUpdate(objectId, updateData, { new: true })
      .select(['_id', 'first_name', 'email', 'phone']);

    if (!user) throw new NotFoundException(MESSAGE.USER_NOT_FOUND);

    return responseSuccessful(user, HttpStatus.OK, [MESSAGE.SUCCESS_UPDATE_USER], STATUS.SUCCESS_STATUS_REQUEST);
  }
}
