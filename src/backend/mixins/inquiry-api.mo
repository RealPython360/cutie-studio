import Types "../types/inquiry";
import InquiryLib "../lib/inquiry";
import List "mo:core/List";

mixin (inquiries : List.List<Types.Inquiry>, counter : { var value : Nat }) {
  public func submitInquiry(
    name : Text,
    email : Text,
    projectType : Text,
    budget : Text,
    deadline : Text,
    description : Text,
  ) : async Text {
    counter.value += 1;
    let inquiry = InquiryLib.create(
      counter.value,
      name,
      email,
      projectType,
      budget,
      deadline,
      description,
    );
    inquiries.add(inquiry);
    inquiry.id;
  };

  public query func getInquiries() : async [Types.Inquiry] {
    InquiryLib.toArray(inquiries);
  };
};
