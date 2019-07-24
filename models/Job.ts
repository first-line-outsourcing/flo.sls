import { User } from '@models/User';
import * as dynamoose from 'dynamoose';
import * as uuid from 'node-uuid'

export type JobStatus = 'offer' | 'declined' | 'accepted' | 'active' | 'pending' | 'pending_payout' | 'paid' | 'disputed' | 'expired';

export interface Payment {
  id: string;
  state: string;
  create_time: string;
  intent: string;
}

export interface Payout {
  payout_batch_id: string;
  transaction_id?: string;
  transaction_status?: string;
  time_processed?: string;
}

export interface Refund {
  id: string;
  state: string;
  create_time: string;
}

export interface JobBody {
  id?: string;
  producerId: string;
  crewId: string;
  startDate: string;
  endDate: string;
  paidDate?: string;
  flatPrice: number;
  status: JobStatus;
  location: string;
  callTime: string;
  duration: string;
  requirements: string;
  optional: string;
  producer?: User;
  crew?: User;
  fund?: Payment;
  payout?: Payout;
  refund?: Refund;
  lat: number;
  lon: number;
}

export class Job implements JobBody {
  public id?: string;
  public producerId: string;
  public crewId: string;
  public startDate: string;
  public endDate: string;
  public paidDate?: string;
  public flatPrice: number;
  public status: JobStatus;
  public location: string;
  public callTime: string;
  public duration: string;
  public requirements: string;
  public optional: string;
  public producer?: User;
  public crew?: User;
  public fund?: Payment;
  public payout?: Payout;
  public refund?: Refund;
  public lat: number;
  public lon: number;

  constructor(job: JobBody) {
    this.id = job.id;
    this.producerId = job.producerId;
    this.crewId = job.crewId;
    this.startDate = job.startDate;
    this.endDate = job.endDate;
    this.paidDate = job.paidDate;
    this.flatPrice = job.flatPrice;
    this.status = job.status;
    this.location = job.location;
    this.callTime = job.callTime;
    this.duration = job.duration;
    this.requirements = job.requirements;
    this.optional = job.optional;
    this.fund = job.fund;
    this.payout = job.payout;
    this.refund = job.refund;
    this.lat = job.lat;
    this.lon = job.lon;
  }

  public static update(oldJob: Job, newJob: Job): Job {
    const job: Job = new Job(oldJob);
    if (newJob.producerId !== undefined) {
      job.producerId = newJob.producerId;
    }
    if (newJob.crewId !== undefined) {
      job.crewId = newJob.crewId;
    }
    if (newJob.startDate !== undefined) {
      job.startDate = newJob.startDate;
    }
    if (newJob.paidDate !== undefined) {
      job.paidDate = newJob.paidDate;
    }
    if (newJob.endDate !== undefined) {
      job.endDate = newJob.endDate;
    }
    if (newJob.flatPrice !== undefined) {
      job.flatPrice = newJob.flatPrice;
    }
    if (newJob.status !== undefined) {
      job.status = newJob.status;
    }
    if (newJob.location !== undefined) {
      job.location = newJob.location;
    }
    if (newJob.callTime !== undefined) {
      job.callTime = newJob.callTime;
    }
    if (newJob.duration !== undefined) {
      job.duration = newJob.duration;
    }
    if (newJob.requirements !== undefined) {
      job.requirements = newJob.requirements;
    }
    if (newJob.optional !== undefined) {
      job.optional = newJob.optional;
    }
    if (newJob.fund !== undefined) {
      job.fund = newJob.fund;
    }
    if (newJob.payout !== undefined) {
      job.payout = newJob.payout;
    }
    if (newJob.refund !== undefined) {
      job.refund = newJob.refund;
    }
    if (newJob.lat !== undefined) {
      job.lat = newJob.lat;
    }
    if (newJob.lon !== undefined) {
      job.lon = newJob.lon;
    }
    return job;
  }
}

export const JobSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
    default: uuid.v4,
  },
  producerId: {
    type: String,
    index: {
      global: true,
      name: 'ProducerIdGlobalIndex',
      rangeKey: 'status',
    },
  },
  crewId: {
    type: String,
    index: {
      global: true,
      name: 'CrewIdGlobalIndex',
      rangeKey: 'status',
    },
  },
  status: {
    type: String,
    enum: ['offer', 'declined', 'active', 'accepted', 'pending', 'pending_payout', 'paid', 'disputed', 'expired']
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  paidDate: {
    type: String,
  },
  flatPrice: {
    type: Number,
  },
  location: {
    type: String,
  },
  callTime: {
    type: String,
  },
  duration: {
    type: String,
  },
  requirements: {
    type: String,
  },
  optional: {
    type: String,
  },
  fund: {
    type: 'map',
    map: {
      id: String,
      state: String,
      create_time: String,
      intent: String,
    },
  },
  payout: {
    type: 'map',
    map: {
      payout_batch_id: String,
      transaction_id: String,
      transaction_status: String,
      time_processed: String,
    },
  },
  refund: {
    type: 'map',
    map: {
      id: String,
      state: String,
      create_time: String,
    },
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
}, {
  useNativeBooleans: true,
  useDocumentTypes: true,
});

export const JobModel = dynamoose.model<JobBody, string>(process.env.JOBS_TABLE as string, JobSchema, { create: false, update: false });
